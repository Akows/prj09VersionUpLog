// src/components/TagList.tsx
import React from 'react';

interface TagListProps {
  tags: string[];
  selectedTag?: string;
  onSelectTag: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = React.memo(({ tags, selectedTag, onSelectTag }) => {
  return (
    <aside className="border-r p-4">
      <h2 className="font-bold mb-2">태그</h2>
      <ul className="space-y-1">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              className={`text-sm ${
                selectedTag === tag ? 'text-blue-500 font-semibold' : 'text-gray-700'
              } hover:underline`}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default TagList;
