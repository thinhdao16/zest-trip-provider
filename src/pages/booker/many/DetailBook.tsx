import { useParams } from "react-router-dom";
import BookDetailScreenMain from "./BookDetailScreenMain";

function DetailBook() {
  useParams<{ index: string }>();

  return (
    <div className="h-[100vh]">
      <div>
        <div
          className={`p-4 
         sm:mr-0 h-screen `}
        >
          <BookDetailScreenMain />
        </div>
      </div>
    </div>
  );
}

DetailBook.propTypes = {};

export default DetailBook;
