import React, { useEffect, useState } from 'react';
import { values } from 'lodash';
import {
  FileFolderStructure,
  FlatFileStructure,
  buildFlatTreeFileStructure,
} from './helper';
import Directory from './Directory';
import { File } from '../Workspace/Workspace.context';

interface ITreeProps {
  files: File[];
}

const Tree: React.FC<ITreeProps> = ({ files }) => {
  const [data, setData] = useState<FlatFileStructure>({});

  useEffect(() => {
    setData(buildFlatTreeFileStructure(files));
  }, [files.length]);

  const getRootNode = () => {
    return values(data).filter(
      (file: FileFolderStructure) => file.root === true
    );
  };

  const getChildNodes = (node: FileFolderStructure) => {
    if (!node.children) return [];
    return node.children.map((path: string) => data[path]);
  };

  const showChildNodes = (node: FileFolderStructure) => {
    setData((prevState) => ({
      ...prevState,
      [node.path]: {
        ...prevState[node.path],
        isOpen: !prevState[node.path].isOpen,
      },
    }));
  };

  const addNewFileFromInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    node: FileFolderStructure
  ) => {
    if (e.target.files.length === 0) return;

    const newFile = e.target.files[0];

    console.log(newFile);

    const reader = new FileReader();

    reader.onload = (fr) => {
      setData((prevState) => ({
        ...prevState,
        [`/${node.path}/${newFile.name}`]: {
          path: `/${node.path}/${newFile.name}`,
          contents: fr.target.result as string,
          type: 'file',
        },
        [node.path]: {
          ...prevState[node.path],
          children: [
            ...prevState[node.path].children,
            `/${node.path}/${newFile.name}`,
          ],
        },
      }));
    };

    reader.readAsText(newFile);
  };

  return (
    <>
      {getRootNode().map((node: FileFolderStructure) => {
        return (
          <Directory
            node={node}
            key={node.path}
            getChildNodes={getChildNodes}
            showChildNodes={showChildNodes}
            addNewFileFromInput={addNewFileFromInput}
          />
        );
      })}
    </>
  );
};

export default Tree;
