interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        {content.split('\n\n').map((paragraph, index) => {
          // Check if it's a heading
          if (paragraph.startsWith('# ')) {
            return (
              <h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                {paragraph.substring(2)}
              </h2>
            );
          }
          
          if (paragraph.startsWith('## ')) {
            return (
              <h3 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {paragraph.substring(3)}
              </h3>
            );
          }

          // Check if it's a list
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(line => line.trim());
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-6">
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
