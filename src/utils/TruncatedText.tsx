const TruncatedText = ({ text, maxLength }: { text: any; maxLength: any }) => {
  const truncatedContent =
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return <>{truncatedContent}</>;
};

export default TruncatedText;
