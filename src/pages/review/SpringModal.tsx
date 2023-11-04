import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Rating } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { replyReview } from "../../store/redux/silce/reviewSlice";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as never, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
};

export default function SpringModal(data: any) {
  const [open, setOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch: AppDispatch = useDispatch();

  const handelReply = () => {
    dispatch(
      replyReview({
        id: data.data.id,
        content: reply,
        tourId: data.data.tour.id,
      })
    ).then((respone) => {
      if (replyReview.fulfilled.match(respone)) {
        data.setRefeshReview((prev: number) => prev + 1);
        setOpen(false);
      }
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-3 flex-wrap">
        {data?.data?.ReviewReplies === null && (
          <button
            onClick={() =>
              data?.data?.ReviewReplies === null ? handleOpen() : null
            }
            className={`font-medium  border rounded-lg px-2 py-1 ${
              data?.data?.ReviewReplies === null
                ? "bg-white text-navy-blue border-navy-blue"
                : "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300"
            }`}
          >
            Reply
          </button>
        )}
      </div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col gap-5 p-8 relative">
              <div className="absolute top-0 right-0 bg-gray-200 rounded-full p-2">
                <AiOutlineClose className="text-gray-700" />
              </div>
              <div className="flex flex-col ">
                <span className="font-semibold text-xl">Reply review</span>
                <span className="">What do you think of the review?</span>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <img
                    src={
                      data?.data?.user?.avatar_image_url ||
                      "https://static.thenounproject.com/png/777906-200.png"
                    }
                    alt="wait me"
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <span className="text-gray-500">
                    {data?.data?.user?.full_name || "person"}
                  </span>
                  <Rating
                    name="half-rating-read"
                    defaultValue={data?.data?.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <span className="text-gray-700">{data?.data?.content}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  Do you follow have any thought you like to share?
                </span>
                <textarea
                  defaultValue={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="h-32 p-4 border bg-main border-gray-300 rounded-lg focus:outline-none flex items-start justify-start"
                />
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  className="bg-navy-blue rounded-lg py-2 px-6 text-white font-medium w-full"
                  onClick={() => handelReply()}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="bg-white border border-gray-400 text-gray-500 w-full rounded-lg font-medium "
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
