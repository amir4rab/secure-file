import React from 'react'
import useStorageQuota from '@/hooks/useStorageQuota';
import { Progress, Text, Box } from '@mantine/core';
import { readableSize }from '@/utils/frontend/fileUtils'

function UsageDisplayer() {
  const { usage, quota } = useStorageQuota();

  return (
    <Box sx={{ width: '25vw', maxWidth: '250px', minWidth: '150px' }}>
      <Text size='xs' mb='xs'>
        {`${ readableSize(parseFloat((quota - usage).toFixed(0))) } is available`}
      </Text>
      <Progress
        radius="xl"
        size="xl"
        value={ parseFloat((usage / quota * 100).toFixed(0)) }
      />
    </Box>
  )
}

export default UsageDisplayer