import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Series {
  id: number;
  thumbnail?: string; // 섬네일 이미지 경로 (없으면 플레이스홀더 표시)
  title: string;      // 시리즈 제목
  postCount: number;  // 시리즈 내 포스팅 개수
  lastPostAt: string; // 마지막 포스팅 작성 시각
}

interface SeriesListProps {
  seriesData: Series[];
}

const SeriesList: React.FC<SeriesListProps> = ({ seriesData }) => {
  const navigate = useNavigate();
  const placeholderImg = 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* 항상 2개씩 표시: grid-cols-2 */}
      <div className="grid grid-cols-2 gap-6">
        {seriesData.map((series) => {
          const thumbnail = series.thumbnail || placeholderImg;

          return (
            <div
              key={series.id}
              onClick={() => navigate(`/series/${series.id}`)}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
              {/* 섬네일 */}
              <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                <img
                  src={thumbnail}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 시리즈 정보 */}
              <h3 className="text-lg font-bold mt-2 text-gray-800 dark:text-gray-100 line-clamp-2">
                {series.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                포스트 {series.postCount}개
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                마지막 작성: {series.lastPostAt}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesList;
