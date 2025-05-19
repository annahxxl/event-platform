## 프로젝트 구조

- Gateway Server: 모든 API 요청의 진입점, 인증, 권한 검사 및 라우팅
- Auth Server: 유저 정보 관리, 로그인, 역할 관리, JWT 발급
- Event Server: 이벤트 생성, 보상 정의, 보상 요청 처리, 지급 상태 저장

## 시작하기

### 서버 실행

```bash
docker-compose up -d
```

### API 테스트

1. Gateway 서버를 통해 API 호출
2. 기본 URL: `http://localhost:8000`

## API 명세

#### 사용자 관리 API

- **회원가입**

  - `POST` `/users/signup`
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string",
      "role": "string" // USER, OPERATOR, AUDITOR, ADMIN
    }
    ```

- **로그인** (refreshToken 생략)
  - `POST` `/auth/login`
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

#### 아이템 관리 API

- **아이템 생성**

  - `POST` `/items`
  - Headers:
    - Authorization: Bearer {token}
  - Request Body:
    ```json
    {
      "type": "string", // EQUIPMENT, RESOURCE, CONSUMABLE
      "name": "string",
      "description": "string"
    }
    ```

- **아이템 조회**
  - `GET` `/items`
  - Headers:
    - Authorization: Bearer {token}

#### 이벤트 관리 API

- **이벤트 생성**

  - `POST` `/events`
  - Headers:
    - Authorization: Bearer {token}
  - Request Body:

    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string", // ACTIVE, INACTIVE
      "conditionType": "string", // ATTENDANCE (추후 확장 가능)
      "conditionConfig": "object", // type: AttendanceConditionConfig ex) {"requireDays": "7"}
      "startDate": "string",
      "endDate": "string"
    }
    ```

    > 다양한 이벤트 조건에 유연하게 대응하기 위해 conditionType과 conditionConfig로 분리하여 관리
    > (예: 출석 체크, 플레이 타임, 업적, 퀘스트(단일 or 스토리) 등 다양한 조건을 추가할 수 있는 구조)

- **보상 생성**

  - `POST` `/events/{eventId}/rewards`
  - Headers:
    - Authorization: Bearer {token}
  - Request Body:
    ```json
    {
      "itemId": "string",
      "amount": "number"
    }
    ```

- **이벤트 조회**

  - `GET` `/events`
  - Headers:
    - Authorization: Bearer {token}

- **이벤트 상세 조회**

  - `GET` `/events/{eventId}`
  - Headers:
    - Authorization: Bearer {token}

#### 보상 요청 관리 API

- **보상 요청**

  - `POST` `/reward-requests`
  - Headers:
    - Authorization: Bearer {token}
    - Request Body:
      ```json
      {
        "rewardId": "string"
      }
      ```

- **내 보상 신청 내역**

  - `GET` `/reward-requests/my`
  - Headers:
    - Authorization: Bearer {token}

- **보상 신청 내역 (관리자용)**
  - `GET` `/reward-requests`
  - Headers:
    - Authorization: Bearer {token}
