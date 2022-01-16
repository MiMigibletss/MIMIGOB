
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
// import { Col, Card, Row } from "antd";
import { withRouter } from "react-router";


const { Meta } = Card;

const blockRead = () => {

    const [Blocks, setBlocks] = useState([]);
    const [Skip, setSkip] = useState("");
    const [Limit, setLimit] = useState("");
    const [PostSize, setPostSize] = useState("");

    // 상품목록 불러오기
    const getBlocks = (body) => {
      Axios.post("/api/mysql/blocks/read", body).then((response) => {
        if (response.data.success) {
          if (body.loadMore) {
            setBlocks([...Blocks, ...response.data.fullBlocks]);
          } else {
            setBlocks(response.data.fullBlocks);
          }
          setPostSize(response.data.postSize);
          setBlocks([...Blocks, ...response.data.fullBlocks]);
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
  
    const renderCards = Blocks.map((fullBlocks, index) => {
      return (
        <div lg={3} md={4} xs={8}>
            <Meta description={fullBlocks.hash }/>
            
        </div>
      );
    });
  
    // default
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
        <div gutter={[16, 16]}>
          <div lg={12} xs={24}></div>
          <div lg={12} xs={24}></div>
        </div>
  
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
              <div gutter={[16, 16]}>{renderCards}</div>
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

export default withRouter(blockRead);