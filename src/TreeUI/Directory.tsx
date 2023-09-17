import React from 'react';
import { FileFolderStructure } from './helper';
import { last } from 'lodash';
import styled from '@emotion/styled';
import { useWorkspaceContext } from '../Workspace/Workspace.context';
import AddFile from './AddFile';

interface IDirectoryProps {
  node: FileFolderStructure;
  getChildNodes: (node: FileFolderStructure) => FileFolderStructure[];
  showChildNodes?: (node: FileFolderStructure) => void;
  addNewFileFromInput?: (
    e: React.ChangeEvent<HTMLInputElement>,
    node: FileFolderStructure
  ) => void;
  level?: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 8px;
  padding-left: ${(props: { level: number; type: string }) => {
    if (props.type === 'file') return `${props.level * 16 + 16}px`;
    return `${props.level * 16}px`;
  }};

  &:hover {
    background: #e6e6e6;
  }
`;

const Node = styled.div`
  font-size: 14px;
  margin-right: 5px;
`;

const Directory: React.FC<IDirectoryProps> = ({
  node,
  getChildNodes,
  showChildNodes,
  addNewFileFromInput,
  level = 0,
}) => {
  const { activeFile, activateFile } = useWorkspaceContext();

  return (
    <>
      <Container
        level={level}
        type={node.type}
        onClick={
          node.type === 'file'
            ? () => activateFile(node.path.slice(1))
            : undefined
        }
      >
        {node.type === 'folder' && (
          <Node onClick={(e: React.MouseEvent) => showChildNodes(node)}>
            {node?.isOpen ? '▼' : '▶'}
          </Node>
        )}
        <Node style={{ marginRight: '10px' }}>
          {node.type === 'folder' && node?.isOpen && '📂'}
          {node.type === 'folder' && !node?.isOpen && '📁'}
          {node.type === 'file' && '📄'}
        </Node>

        <span>{last(node.path.split('/'))}</span>
        {node.type === 'folder' && (
          <AddFile node={node} onFileChange={addNewFileFromInput} />
        )}
      </Container>
      {node?.isOpen &&
        getChildNodes(node).map((childNode) => (
          <Directory
            key={childNode.path}
            node={childNode}
            getChildNodes={getChildNodes}
            showChildNodes={showChildNodes}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default Directory;
