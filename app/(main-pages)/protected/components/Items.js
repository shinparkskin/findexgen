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
import Carousel from "./Carousel";
function Items() {
  const [searchOption, setSearchOption] = useState("기한 적은순");
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [platform, setPlatform] = useState("");
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const ExternalLinks = [
    {
      name: "강남맛집",
      url: "https://xn--939au0g4vj8sq.net",
      imageUrl: "/강남맛집.png",
    },
    {
      name: "놀러와체험단",
      url: "https://www.cometoplay.kr/index.php",
      imageUrl: "/놀러와체험단.png",
    },
    {
      name: "디너의여왕",
      url: "https://dinnerqueen.net",
      imageUrl: "/디너의여왕.png",
    },
    {
      name: "데일리뷰",
      url: "https://www.dailyview.kr",
      imageUrl: "/데일리뷰.png",
    },
    {
      name: "가보자체험단",
      url: "http://xn--o39a04kpnjo4k9hgflp.com",
      imageUrl: "/가보자체험단.png",
    },
    {
      name: "미스터블로그",
      url: "http://www.mrblog.net",
      imageUrl: "/미스터블로그.png",
    },
    {
      name: "오마이블로그",
      url: "https://kormedia.co.kr",
      imageUrl: "/오마이블로그.png",
    },
    {
      name: "서울오빠",
      url: "https://www.seoulouba.co.kr",
      imageUrl: "/서울오빠.png",
    },
    {
      name: "리뷰플레이스",
      url: "https://www.reviewplace.co.kr",
      imageUrl: "/리뷰플레이스.png",
    },
    {
      name: "체험뷰",
      url: "https://chvu.co.kr",
      imageUrl: "/체험뷰.png",
    },
    {
      name: "리뷰노트",
      url: "https://www.reviewnote.co.kr",
      imageUrl: "/리뷰노트.png",
    },
    {
      name: "클라우드뷰",
      url: "https://www.cloudreview.co.kr",
      imageUrl: "/클라우드뷰.png",
    },
  ];
  const dummyData = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      title: `Loading...`,
      end_at_timestamp: 0,
      image_url: "",
      link: "",
      platform: "",
    }));
  // debounced search handler
  const debouncedSearch = debounce(async (searchTerm) => {
    
    const offsetValue = (page - 1) * pageSize; // Calculate offset
    const limitValue = pageSize;

    const { data, error } = await supabase.rpc("get_platform_data",
      {sort_option:searchOption,
        offset_value: offsetValue,
        limit_value: limitValue,
        search:search

      }


    );

    console.log("data:", data);
    if (error) {
      console.log("Error fetching data:", error);
    } else {
      setData(data);
      setTotalCount(count);
      setTotalPage(Math.ceil(count / 10)); // Assuming count is the total number of items
    }
  }, 500); // 500ms delay

  useEffect(() => {
    debouncedSearch(search);
    // 컴포넌트가 언마운트될 때 진행 중인 debounce 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [page, search, searchOption]); // search를 의존성 배열에 추가
  const [count, setCount] = useState(0);

  const getCount = async () => {
    const { data, error,count } = await supabase
      .from("exgen")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting count:", error);
      return;
    }

    setCount(count);
    setTotalPage(Math.ceil(count / 1));
  };

  useEffect(() => {
    getCount();
  }, []);

  console.log("totalPage:", totalPage);
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
      <div className="flex flex-col w-full h-full gap-y-5">
        {data.length === 0 ? (
          <Spinner />
        ) : (
          data.map((item, index) => (
            item?.data?.length > 0 && ( // Check if item.data has elements
              <div key={index}>
                <h1 className="text-4xl font-bold">{item.platform}</h1>
                <Carousel data={item.data}></Carousel>
              </div>
            )
          ))
        )}
      </div>

      
      <div className="w-full h-auto flex justify-center items-center mt-10">
        <Pagination
          initialPage={page}
          total={100}
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
