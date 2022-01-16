
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

import {Card,Col} from "antd"
import { withRouter } from "react-router";


const { Meta } = Card;

const BlockRead = () => {

    const [Blocks, setBlocks] = useState([]);
  const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(2);
    const [PostSize, setPostSize] = useState(0);
    // 상품목록 불러오기
    const getBlocks = (body) => {
      Axios.post("/api/mysql/blocks/read", body).then((response) => {
        if (response.data.success) {
          if (body.loadMore) {
            setBlocks([...Blocks, ...response.data.fullblock]);
          } else {
            // setBlocks(response.data.fullblock);
          }
        //   setPostSize(response.data.postSize);
          setBlocks([...Blocks, ...response.data.fullblock]);
        } else {
          alert("Failed to fectch post datas");
        }
      });
    };
    
    // 더보기 버튼
    const loadMoreHandler = () => {
      let skip = Skip + Limit;
      let variables = {
        skip: skip,
        limit: Limit,
        loadMore: true,
      };
  
      getBlocks(variables);
      setSkip(skip);
    };
  
    const renderCards = Blocks.map((fullblock, index) => {
    
        return (
          <Col lg={3} md={4} xs={8}>
          <div>dd</div>
          <div>{fullblock.hash}</div>
          </Col>
        );
      })
    useEffect(() => {
      let variables = {
        skip: Skip,
        limit: Limit,
      };
  
      getBlocks(variables);
    }, []);
   
    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>상품 메인 화면</h2>
        </div>
  
        {/* 상품, 가격 필터 */}
        {/* <div gutter={[16, 16]}>
          <div lg={12} xs={24}></div>
          <div lg={12} xs={24}></div>
        </div> */}
  
        {/* 등록된 상품이 0개면 "상품없다고 출력  */}
        {Blocks.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>등록된 상품이 없읍니다</h2>
          </div>
        ) : (
              <div >{renderCards}</div>
        )}
        <br />
  
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    );
  };

export default withRouter(BlockRead);