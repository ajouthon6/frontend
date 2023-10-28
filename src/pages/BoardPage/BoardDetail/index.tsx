import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import Badge from "./Badge";
import { getTargetBoard } from "../../../api/board";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  targetId: number;
}

function BoardDetail({ showModal, setShowModal, targetId }: Props) {
  const user = useSelector((state: { user: any }) => state.user);
  const [animation, setAnimation] = useState(false);
  const [boardData, setBoardData] = useState({
    boardId: 0,
    body: "",
    dueDate: "",
    isFinished: false,
    memberId: 0,
    tags: [],
    title: "",
    viewCount: 0,
  });

  const getBoardData = async () => {
    try {
      const result = await getTargetBoard(targetId);
      setBoardData(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (targetId === 0) return;
    getBoardData();
  }, [targetId]);

  useEffect(() => {
    if (showModal) setTimeout(() => setAnimation(true), 1);
  }, [showModal]);

  useEffect(() => {
    if (!animation) setTimeout(() => setShowModal(false), 701);
  }, [animation]);

  if (!showModal) return null;
  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80 scale-100 flex transition-opacity duration-700 ${
        animation ? "active opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto md:mt-10">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
          <div className="flex justify-between mb-4 rounded-t sm:mb-5">
            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
              <h3 className="font-semibold ">{boardData.title}</h3>
            </div>
            <div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setAnimation(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <MDEditor.Markdown
                style={{ padding: 10 }}
                source={boardData.body}
              />
            </div>
            <hr />
            <div className="my-5 flex gap-5">
              {boardData.tags.map((item) => (
                <Badge name={item} key={item} />
              ))}
            </div>
            <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              마감일
            </div>
            <div className="mb-5 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {boardData.dueDate.slice(0, 10)}
            </div>
            <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              조회수
            </div>
            <div className="mb-5 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {boardData.viewCount}
            </div>
          </div>
          {user.id === boardData.memberId && (
            <div className="flex justify-between items-center gap-4 mt-10">
              <button
                type="button"
                className="w-1/2 text-white inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => console.log("first")}
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                수정
              </button>
              <button
                type="button"
                className="w-1/2 inline-flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => console.log("ds")}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
