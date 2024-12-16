import React from "react";
import { Link } from "@nextui-org/react";
function LinkSection() {
  const ExternalLinks=[
    {
      'name':'강남맛집',
      'url':'https://xn--939au0g4vj8sq.net',
      'imageUrl':'/강남맛집.png'
    },
    {
      'name':'놀러와체험단',
      'url':'https://www.cometoplay.kr/index.php',
      'imageUrl':'/놀러와체험단.png'
    },
    {
      'name':'디너의여왕',
      'url':'https://dinnerqueen.net',
      'imageUrl':'/디너의여왕.png'
    },
    {
      'name':'데일리뷰',
      'url':'https://www.dailyview.kr',
      'imageUrl':'/데일리뷰.png'
    },
    {
      'name':'가보자체험단',
      'url':'http://xn--o39a04kpnjo4k9hgflp.com',
      'imageUrl':'/가보자체험단.png'
    },
    {
      'name':'미스터블로그',
      'url':'http://www.mrblog.net',
      'imageUrl':'/미스터블로그.png'
    },
    {
      'name':'오마이블로그',
      'url':'https://kormedia.co.kr',
      'imageUrl':'/오마이블로그.png'
    },
    {
      'name':'서울오빠',
      'url':'https://www.seoulouba.co.kr',
      'imageUrl':'/서울오빠.png'
    },
    {
      'name':'리뷰플레이스',
      'url':'https://www.reviewplace.co.kr',
      'imageUrl':'/리뷰플레이스.png'
    },
    {
      'name':'체험뷰',
      'url':'https://chvu.co.kr',
      'imageUrl':'/체험뷰.png'
    },
    {
      'name':'리뷰노트',
      'url':'https://www.reviewnote.co.kr',
      'imageUrl':'/리뷰노트.png'
    },
    {
      'name':'클라우드뷰',
      'url':'https://www.cloudreview.co.kr',
      'imageUrl':'/클라우드뷰.png'
    },
  ]
  return (
    <div className="flex flex-wrap gap-1 justify-center items-center py-5">
      {ExternalLinks.map((link) => (
        <Link target="_blank" isBlock showAnchorIcon color="primary" href={link.url} key={link.name}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default LinkSection;
