
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../static/writon_logo.svg'
import checkAllIcon_dis from '../static/signup_checkall_disabled.svg'
import checkAllIcon from '../static/signup_checkall.svg'
import checkIcon_dis from '../static/signup_check_disabled.svg'
import checkIcon from '../static/signup_check.svg'

const SignupWrapper = styled.div`
  font-family: 'Pretendard';
  text-align: center;
  padding-top: 76px;
  padding-bottom: 100px;

  .logo{
    margin-bottom: 68px;
    cursor: pointer;
  }
`;

const SignupForm = styled.form`
  width: 614px;
  margin: 0 auto;
  font-size: 16px;

  .field{
    position: relative;
    display: flex;
    flex: 1 1 0;
    justify-content: center;
    padding-top: 24px;
  }

  .field div{
    flex-basis: 90px;
    text-align: left;
    margin: auto 0;
  }

  .field input{
    margin: auto;
    padding: 16px;
    flex-basis: 328px;
    border-radius: 8px;
    border: 1px solid #E3E5E5;
  }

  .field input:focus{
    outline: none;
  }

  .field input::placeholder{
    font-family: 'Pretendard';
    color: #72777A;
  }

  .field button{
    flex-basis: 136px;
    border-radius: 8px;
    border: 0;
    color: white;
    background: var(--challenging-blue);
  }

  button:disabled{
    color: white;
    background: #DDDEE1;
  }

  .message{
    font-size: 12px;
    padding-left: 120px;
    padding-top: 12px;
    text-align: left;
  }

  .errorMessage{
    color: #FF5247;
  }

  .field .errorBox{
    border: 2px solid #FF5247;
  }

  .field:last-of-type{
    margin-top: 22px;
    margin-bottom: 63px;
  }
  
  .field:last-of-type div{
    margin-top: 0;
  }

  .policy{
    flex-grow: 1;
    font-size: 12px;
  }

  .policy div {
    display: flex;
    justify-content: center;
  }

  .policy div span{
    width: 160px;
    margin-left: 16px;
    margin-right: 28px;
  }

  .check{
    padding-bottom: 22px;
  }

  .check span{
    color: #7C8089;
  }

  .check img:hover{
    cursor: pointer;
  }

  .check a{
    color: #7C8089;
    text-decoration: underline;
  }
  
  .check a:hover{
    color: #7C8089;
    text-decoration: underline;
    cursor: pointer;
  }

  .check:nth-child(1) span{
    color: #000000;
  }

  .signupBtn{
    width: 328px;
    height: 48px;
    border: 0;
    color: white;
    background-color: var(--challenging-blue);
    border-radius: 8px;
  }

  .hidden{
    visibility: hidden;
  }

  .none{
    display: none;
  }

`

const Signup = () => {
    const navigate = useNavigate()
    const [userId,setUserId] = useState('')
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [username,setUsername]=useState('');
    const [email,setEmail] = useState('')
    const [phone, setPhone]=useState('');
    const [idError, setIdError] = useState(false);
    const [password1Error, setPassword1Error] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [check, setCheck] = useState([false, false, false]);
    const [signupFlag, setSignupFlag]= useState(false);

    useEffect(() => {
      if (!idError && userId
        && !password1Error && password1
        && !password2Error && password2
        && emailConfirmed
        && username.length>0 
        && phone.length===11
        && check[0] && check[1]){
          setSignupFlag(true);
        }
      else{
        setSignupFlag(false);
      }
    }, [idError, password1Error, password2Error, username, email, phone, ...check])
    
    const homeRoute = (e)=>{
      navigate('/')
    }

    const LoginSubmit =(e)=>{
      e.preventDefault();
      navigate('/')
    }

    const handleIdChange = (e)=>{
      const value = e.target.value;
      const regex = /^[a-zA-Z0-9]{0,11}$/
      if (regex.test(value)){
        setUserId(value)
      }
      else if (value.length < userId.length){
        setPhone(value);
      }
    }

    const handlePassword1Change = (e)=>{
      const value=e.target.value;
      const regex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\[\]\/\\\.,<>?;':"{}|\-_+~!@#$%^&*()=\`\[\]])[A-Za-z\d\[\]\/\\\.,<>?;':"{}|\-_+~!@#$%^&*()=\`\[\]]{8,}$/;
      setPassword1(value);
      console.log(password1)
      if (!regex.test(value)){
        setPassword1Error(true);
      }
      else{
        setPassword1Error(false);
      }
    }

    const handlePassword2Change = (e)=>{
      const value=e.target.value;
      setPassword2(value);
      if (password1!==value){
        setPassword2Error(true);
      }
      else{
        setPassword2Error(false);
      }
    }

    const handleUsernameChange = (e)=>{
      if (username.length<=8){
        setUsername(e.target.value);
      }
    }

    const handleEmailChange = (e)=>{
      setEmail(e.target.value)
    }

    const handlePhoneChange  = (e)=>{
      const value = e.target.value;
      const regex = /^[0-9]{0,11}$/
      if (regex.test(value)){
        setPhone(value)
      }
      else if (value.length < phone.length){
        setPhone(value);
      }
    }

    const handleIdClick = (e) =>{
      e.preventDefault();
      //[needFix]
      //fetch to server, check if duplicated
      //for test,
      //if userId==="existing", show error
      if (userId==="existing"){
        setIdError(true);
      }
      else{
        setIdError(false);
      }
    }

    const handleEmailClick = (e)=>{
      e.preventDefault();
      //[needFix]
      //email confirm fetch to server
      //if successful,
      setEmailConfirmed(true);

    }

    const handleCheckAll = ()=>{
      if (check.every(c => c === true)===false){
        setCheck([true, true, true]);
      }
      else{
        setCheck([false, false, false]);
      }
    }

    const handleCheck = (idx)=>{
      const newCheck = [...check];
      newCheck[idx] = !newCheck[idx];
      console.log(newCheck)
      setCheck(newCheck);
    }

    return (

    <SignupWrapper>
        <img className='logo' src={logo} alt='writon' onClick={homeRoute}/>
      <SignupForm>
        <div className='field'>
          <div>아이디</div>
          <input type='text' className={(idError)?"errorBox":""} placeholder='영문, 숫자 5-11자' value={userId} onChange={handleIdChange} />
          <button disabled={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,11}$/.test(userId)?false:true} onClick={handleIdClick}>중복 확인</button>
        </div>
        {idError?(
          <div className='message'>
            <span className='errorMessage'>중복된 아이디입니다.</span>
          </div>
        ):""}
        <div className='field'>
          <div>비밀번호</div>
          <input type='password' className={(password1Error)?"errorBox":""} placeholder='숫자, 영문, 특수문자 조합 최소 8자' value={password1} onChange={handlePassword1Change} />
          <button className='hidden'/>
        </div>
        {password1Error?(
          <div className='message'>
            <span className='errorMessage'>비밀번호를 확인해주세요. (숫자, 영문, 특수문자 조합 최소 8자)</span>
          </div>
        ):""}

        <div className='field'>
          <div>비밀번호 확인</div>
          <input type='password' className={(password2Error)?"errorBox":""} placeholder='비밀번호 재입력' value={password2} onChange={handlePassword2Change} />
          <button className='hidden'/>
        </div>
        {password2Error?(
          <div className='message'>
            <span className='errorMessage'>비밀번호가 일치하지 않습니다.</span>
          </div>
        ):""}

        <div className='field'>
          <div>닉네임</div>
          <input type='text' placeholder='닉네임을 입력해주세요 (8자 제한)' value={username} onChange={handleUsernameChange} />
          <button className='hidden'/>
        </div>
        <div className='field'>
          <div>이메일</div>
          <input type='email' value={email} onChange={handleEmailChange} />
          <button disabled={email.indexOf("@")>0?false:true}  onClick={handleEmailClick}>인증 요청</button>
        </div>
        <div className='message'>
          <span className='emailMessage'> 계정 분실 시 본인인증을 위한 입력이 필요해요.</span>
        </div>
        <div className='field'>
          <div>휴대폰</div>
          <input type='text' placeholder="'-' 빼고 숫자만 입력" value={phone} onChange={handlePhoneChange}/>
          <button className='hidden'/>
        </div>
        <div className='field'>
          <div>이용약관 동의</div>
          <div className='policy'>
            <div className='check'>
              <img onClick={handleCheckAll} src={check.every(c => c === true)?checkAllIcon:checkAllIcon_dis}/>
              <span>약관 전체 동의 (선택 동의 포함)</span>
              <a className='hidden'>자세히</a>
            </div>
            <div className='check'>
              <img onClick={()=>handleCheck(0)} src={check[0]?checkIcon:checkIcon_dis}/>
              <span>[필수] 라이톤 이용약관 동의</span>
              <a>자세히</a>
            </div>
            <div className='check'>
              <img onClick={()=>handleCheck(1)} src={check[1]?checkIcon:checkIcon_dis}/>
              <span>[필수] 개인정보 수집 및 이용 동의</span>
              <a>자세히</a>
            </div>
            <div className='check'>
              <img onClick={()=>handleCheck(2)} src={check[2]?checkIcon:checkIcon_dis}/>
              <span>[선택] 광고성 정보 수신 동의</span>
              <a>자세히</a>
            </div>
          </div>
          <button className='hidden'/>
        </div>
        <button className='signupBtn' disabled={signupFlag?false:true} onClick={LoginSubmit}>가입하기</button>
      </SignupForm>
    </SignupWrapper>
  )
}

export default Signup

