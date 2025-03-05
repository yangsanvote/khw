import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 방문자 수 JSON 파일 경로
const visitorFilePath = path.join(process.cwd(), 'src/data/visitor-count.json');

// 방문자 수 읽기
function getVisitorCount() {
  try {
    const data = fs.readFileSync(visitorFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('방문자 수 파일을 읽는 중 오류 발생:', error);
    return { count: 2253 }; // 기본값 설정
  }
}

// 방문자 수 증가 및 저장
function incrementVisitorCount() {
  try {
    const data = getVisitorCount();
    data.count += 1;
    fs.writeFileSync(visitorFilePath, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('방문자 수 업데이트 중 오류 발생:', error);
    return { count: 2253 }; // 오류 시 기본값 반환
  }
}

export async function GET() {
  // 방문자 수 증가 및 최신 카운트 반환
  const visitorData = incrementVisitorCount();
  
  return NextResponse.json({
    count: visitorData.count,
    success: true
  });
} 