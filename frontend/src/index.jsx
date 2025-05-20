import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Transportation Management System 소개</h1>
      <section>
        <h2>기원</h2>
        <p>
          TMS(Transportation Management System)는 물류 흐름을 효율적으로 계획하고 최적화하기 위해 개발되었습니다. 초기에는 배송 일정만 관리하던 도구였으나, 점차 운송 수단과 노선, 비용 등을 통합 관리하는 시스템으로 발전했습니다.
        </p>
      </section>
      <section>
        <h2>현재 사용 방법</h2>
        <p>
          오늘날 TMS는 운송 업체에서 차량 배차와 경로 최적화, 실시간 추적 등에 널리 활용되고 있습니다. 관리자와 기사 모두 웹과 모바일을 통해 접속하여 언제 어디서나 물류 상황을 확인하고 신속하게 대응할 수 있습니다.
        </p>
      </section>
      <Link to="/login">OAuth 로그인</Link>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="container">
      <h1>로그인</h1>
      <a href="http://localhost:3001/auth/google">Google 계정으로 로그인</a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
