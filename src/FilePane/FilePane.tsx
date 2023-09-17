import React from 'react';
import { Box, Typography } from '@mui/material';
import { FileRow } from './components/FileRow';
import { useWorkspaceContext } from '../Workspace/Workspace.context';
import Tree from '../TreeUI/Tree';
import { buildFlatTreeFileStructure } from '../TreeUI/helper';

export const FilePane = () => {
  const { files } = useWorkspaceContext();

  return (
    <Box>
      <Box p={1}>
        <Typography variant='h6'>Files</Typography>
      </Box>
      <Box>
        <Tree files={files} />
      </Box>
    </Box>
  );
};
