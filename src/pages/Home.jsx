import React from "react";
import styled from "styled-components";
import LeftNav from "../components/LeftNav";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import ChallengeStory from "../components/ChallengeStory";
import ChallengeFeed from "../components/ChallengeFeed";
import { postLoginMain, getChallenge } from "../remotes";
import ClipLoader from "react-spinners/ClipLoader";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryState,
  challengeState,
  detailuserState,
  authState,
  loadingState,
  activeChallengeState,
  challengeToastState,
  certainToastState,
} from "../atoms/auth";

const Home = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const setChallenge = useSetRecoilState(challengeState);
  const setCategory = useSetRecoilState(categoryState);
  const setDetailuser = useSetRecoilState(detailuserState);
  const setActiveChallenge = useSetRecoilState(activeChallengeState);
  const [auth, setAuth] = useRecoilState(authState);
  const [certainToast, setCertainToast] = useRecoilState(certainToastState);

  const Retoken = () => {
    getAccessToken()
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        console.log("access 토큰 만 재발급");
      })
      .catch((error) => {
        if (error.response.data.code === 419) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("로그인을 다시 하세요");
          window.location.reload();
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    localStorage.removeItem("fixChallenge");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      postLoginMain()
        .then((res) => {
          console.log(res);
          setChallenge(res.data.data.challengesArray);
          setCategory(res.data.data.category);
          setDetailuser({
            nickname: res.data.data.nickname,
            challengeCertain: res.data.data.challengeCertain,
          });
          setActiveChallenge({
            userChallengeSu: res.data.data.userChallengeSu,
            coopen: res.data.data.coopen,
            userChallengeArray: res.data.data.userChallengeArray,
          });
          setLoading(false);
          setAuth(true);
        })
        .catch((err) => {
          if (err.response.data.code === 419) {
            //Retoken();
            //getLoginMain();// 재귀함수? 필요없나.. 고민
          } else {
            console.log(err);
          }
        });
    } else {
      getChallenge()
        .then((res) => {
          setChallenge(res.data.data.challengesArray);
          setCategory(res.data.data.category);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#266cf4" loading={loading} size={170} />
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <ChallengeStory />
          <ChallengeFeed />
        </Container>
      </div>
    );
  }
};

export default Home;

const Container = styled.div`
  background-color: #ffffff;
  max-width: 920px;
  margin: auto;
  /* height: 1000px; */
  margin-top: 80px;
  padding-top: 0.1px;
`;

// const Main = styled.div`
//   /* background-color: lightgreen; */
//   width: 100%;
// `;

//전체 width가 1390px 되면 사이드바 사라지게끔 하기
