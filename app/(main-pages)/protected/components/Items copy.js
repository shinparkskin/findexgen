"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import {
  Input,
  Select,
  SelectItem,
  Pagination,
  Spinner,
  Skeleton,
} from "@nextui-org/react";
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { debounce } from "lodash";

function Items() {
  const [searchOption, setSearchOption] = useState("기한 적은순");
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [pageSize, setPageSize] = useState(16);
  const [search, setSearch] = useState("");
  const dummyData = Array(16).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Loading...`,
    end_at_timestamp: 0,
    image_url: "",
    link: "",
    platform: ""
  }));
  // debounced search handler
  const debouncedSearch = debounce(async (searchTerm) => {
    const today = Math.floor(Date.now() / 1000);
    
    let query = supabase
      .from("exgen")
      .select("*", { count: "exact" })
      .gte("end_at_timestamp", today);

    // 검색어가 있는 경우 검색 조건 추가
    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    // Sort by end_at_timestamp descending if searchOption is "기한 적은순"
    if (searchOption === "기한 적은순") {
      query = query.order("end_at_timestamp", { ascending: true });
    }
    if (searchOption === "기한 많은순") {
      query = query.order("end_at_timestamp", { ascending: false });
    }
    if (searchOption === "지원 적은순") {
      query = query.order("applyCount", { ascending: true });
    }
    if (searchOption === "지원 많은순") {
      query = query.order("applyCount", { ascending: false });
    }
    if (searchOption === "모집 많은순") {
      query = query.order("demandCount", { ascending: false });
    }
    if (searchOption === "모집 적은순") {
      query = query.order("demandCount", { ascending: true });
    }

    const { data, error, count } = await query
      .limit(pageSize)
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      console.log(error);
    }
    setData(data);
    setTotalCount(count);
    setTotalPage(Math.ceil(count / pageSize));
  }, 500); // 500ms 딜레이

  // getData 함수 수정
  const getData = async () => {
    debouncedSearch(search);
  };

  useEffect(() => {
    getData();
    // 컴포넌트가 언마운트될 때 진행 중인 debounce 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [page, search, searchOption]); // search를 의존성 배열에 추가

  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-10 py-5">
        <Input
          startContent={<IoSearch />}
          placeholder="검색"
          className="w-full max-w-full"
          onChange={(e) => setSearch(e.target.value)}
        ></Input>

        <Select
          selectedKeys={[searchOption]}
          className="w-full"
          classNames={{
            trigger: "w-full",
            mainWrapper: "w-full",
          }}
          onSelectionChange={(keys) => setSearchOption(Array.from(keys)[0])}
        >
          <SelectItem value="기한 적은순" key="기한 적은순">
            기한 적은순
          </SelectItem>
          <SelectItem value="기한 많은순" key="기한 많은순">
            기한 많은순
          </SelectItem>
          <SelectItem value="지원 적은순" key="지원 적은순">
            지원 적은순
          </SelectItem>
          <SelectItem value="지원 많은순" key="지원 많은순">
            지원 많은순
          </SelectItem>
          <SelectItem value="모집 많은순" key="모집 많은순">
            모집 많은순
          </SelectItem>
          <SelectItem value="모집 적은순" key="모집 적은순">
            모집 적은순
          </SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 w-full">
        {data.length === 0
          ? dummyData.map((item, index) => (
              <Card
                className="flex flex-row overflow-visible text-foreground bg-content1 shadow-large rounded-md transition-all w-full"
                radius="lg"
                key={index}
              >
                <div className="flex flex-col gap-y-2 p-4 w-full">
                  <Skeleton className="rounded-lg w-full">
                    <div className="h-4 w-full rounded-lg bg-default-300" style={{ width: '100%' }} />
                  </Skeleton>
                  <Skeleton className="rounded-lg w-full">
                    <div className="h-4 w-full rounded-lg bg-default-200" style={{ width: '100%' }} />
                  </Skeleton>
                  <Skeleton className="rounded-lg w-full">
                    <div className="h-16 w-full rounded-lg bg-default-300" style={{ width: '100%' }} />
                  </Skeleton>
                </div>
                
              </Card>
            ))
          : data.map((item, index) => (
              <Card
                className="col-span-1"
                key={index}
              >
                <Link href={item.url} target="_blank">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                    <h4 className="font-bold text-lg line-clamp-2 text-center w-full">
                      {item.title}
                    </h4>
                    <p className=" w-full text-end text-sm">
                      플랫폼: {item.platform}
                    </p>
                    <p className=" w-full text-end text-sm">
                      마감일: {formatDate(item.end_at)}
                    </p>
                  </CardHeader>
                  <CardBody className="flex justify-center items-center py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-2xl"
                      src={item.s3Url}
                      width={250}
                      height={200}
                    />
                  </CardBody>
                </Link>
              </Card>
            ))}
      </div>
      <div className="w-full h-auto flex justify-center items-center mt-10">
        <Pagination
          initialPage={page}
          total={totalPage}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
}

export default Items;

// formatDate 함수 추가
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
