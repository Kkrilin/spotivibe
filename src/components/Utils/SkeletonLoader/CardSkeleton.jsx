import { Skeleton } from "@mui/material";
export const CardSkeleton = ({ profile, type }) => {
  return (
    <>
      {Array.from(new Array(3)).map((_, id) => (
        <div className={profile ? "big_card" : "small_card"} key={id}>
          <Skeleton
            sx={
              profile
                ? { width: 220, height: 220, bgcolor: "grey.800" }
                : { width: 50, height: 50, bgcolor: "grey.800" }
            }
            variant={type === "playlist" ? "rounded" : "circular"}
            
          />
          <div>
            <Skeleton
              sx={{ bgcolor: "grey.800", fontSize: "1rem", width: "3rem" }}
              variant="text"
            />
            <Skeleton
              sx={{ bgcolor: "grey.800", fontSize: "1rem" }}
              variant="text"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
