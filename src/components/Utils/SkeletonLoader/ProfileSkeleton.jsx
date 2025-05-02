import { Skeleton } from '@mui/material';
export const ProfileSkeleton = () => {
  return (
    <>
      <div className="profile_pic">
        <div>
          <Skeleton sx={{ bgcolor: 'grey.900' }} variant="circular" width={220} height={220} />
        </div>
        <div
          style={{
            marginLeft: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '1rem', width: '10rem' }} />

          <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '5rem', width: '15rem' }} />
          <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '1rem' }} />
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
