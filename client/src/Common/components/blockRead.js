
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Box, Text } from 'grommet';
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
          <Box width="400px" height="600px"align="stretch" textAlign= "center" justify="center" flex="shrink" basis="medium" direction="column" round="medium" fill="vertical" background={{ "dark": false, "color": "brand", "opacity": "medium" }} overflow="visible" pad="xsmall">
          <Text><strong>난이도:</strong> 22 </Text>
          <Text><strong>소요시간:</strong> 22</Text>
          <Text truncate={true}><strong>해시:</strong>{fullblock.hash} </Text>
          <Text><strong>넌스:</strong> 22 </Text>
          <Text truncate={true}><strong>생성시간:</strong> 22</Text>
      </Box>
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
          <h2>블록</h2>
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
          <Box textAlign= "center"> <Text  textAlign= "center"><div  textAlign= "center">{renderCards}</div></Text></Box>
             
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