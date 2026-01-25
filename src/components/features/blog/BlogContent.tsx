interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="space-y-6 leading-relaxed text-gray-700 dark:text-gray-300">
        {content.split('\n\n').map((paragraph, index) => {
          // Check if it's a heading
          if (paragraph.startsWith('# ')) {
            return (
              <h2
                key={index}
                className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-white"
              >
                {paragraph.substring(2)}
              </h2>
            );
          }

          if (paragraph.startsWith('## ')) {
            return (
              <h3
                key={index}
                className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white"
              >
                {paragraph.substring(3)}
              </h3>
            );
          }

          // Check if it's a list
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter((line) => line.trim());
            return (
              <ul key={index} className="my-6 list-inside list-disc space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {item.substring(2)}
                  </li>
                ))}
              </ul>
            );
          }

          // Regular paragraph
          return (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
};
