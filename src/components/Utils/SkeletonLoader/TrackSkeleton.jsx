import { Skeleton } from '@mui/material';

export function TrackSkeleton() {
  return (
    <div className="">
      <div style={{ padding: '1.5rem' }}>
        {Array.from(new Array(5)).map((_, id) => (
          <Skeleton
            sx={{
              width: 800,
              height: 40,
              bgcolor: 'grey.800',
              marginBottom: '1rem',
            }}
            variant="rounded"
            key={id}
          />
        ))}
      </div>
    </div>
  );
}

export default TrackSkeleton;
