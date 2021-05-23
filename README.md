![header](https://capsule-render.vercel.app/api?type=cylinder&color=gradient&height=120&section=header&text=My%20Page&fontSize=40)

# \# 개발 환경
#### 0. Dockerfile 빌드
```
# 프로젝트 root 디렉토리에서
docker build --tag my_node:x.x.x .
```

#### 1. 컨테이너 실행
```
docker run -d -it \
       -p 3000:3000 \
       -v /Users/jwkim/DockerShare/my_page_server/:/app \
       --name my_page_server tkakcy159/my_page_server:x.x.x
```

#### 2. 컨테이너 접속
```
docker exec -it my_page_server /bin/bash
```

#### 3. 컨테이너 커밋
```
docker commit my_page_server tkakcy159/my_page_server:x.x.x
```

#### 4. 필요한 의존성 설치
```
npm install
```

#### 5. 프로젝트 실행
```
npm start
```

#### 6. 프로젝트 환경 변경
```
* 개발(집)
export NODE_ENV=DEV

* 개발(원격지)
export NODE_ENV=DEV_REMOTE

* 운영
export NODE_ENV=PROD
```
---

