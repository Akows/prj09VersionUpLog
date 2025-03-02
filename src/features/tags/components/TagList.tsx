// src/components/TagList.tsx
import React from 'react';

interface TagListProps {
  tags: string[];
  selectedTag?: string;
  tagCounts: Record<string, number>;
  onSelectTag: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = React.memo(({ tags, selectedTag, tagCounts, onSelectTag }) => {
  return (
    <aside className="p-4 var(--color-bg) dark:bg-gray-700 rounded-lg shadow-sm">
      <h2 className="font-bold text-lg mb-3 var(--color-text) dark:text-gray-100">태그</h2>
      <ul className="space-y-2">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              className={`w-full text-left px-3 py-2 rounded transition flex justify-between items-center ${
                selectedTag === tag 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-blue-600'
              }`}
              onClick={() => onSelectTag(tag)}
            >
              <span>{tag}</span>
              <span className="text-xs font-normal">({tagCounts[tag] || 0})</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default TagList;
