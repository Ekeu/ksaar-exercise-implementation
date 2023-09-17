import { File } from '../Workspace/Workspace.context';

export interface FileFolderStructure {
  type: 'file' | 'folder';
  root?: boolean;
  path: string;
  children?: string[];
  isOpen?: boolean;
}

export interface FlatFileStructure {
  [key: string]: FileFolderStructure;
}

export const buildFlatTreeFileStructure = (
  files: File[]
): FlatFileStructure => {
  // Sorting files by path to ensure order
  files.sort((a, b) => a.path.localeCompare(b.path));

  const fileTree = {};

  for (const file of files) {
    const pathParts = file.path.split('/');

    // Initialize the current directory in the fileTree if it doesn't exist
    let currentPath = '';
    for (const part of pathParts) {
      currentPath += `/${part}`;
      if (!fileTree[currentPath]) {
        fileTree[currentPath] = {
          type: 'folder',
          path: currentPath,
          children: [],
        };
      }
    }

    // Check if it's a file or a directory
    if (file.path.indexOf('.') !== -1) {
      // It's a file, it should have a type of 'file' and it's contents
      fileTree[currentPath] = {
        type: 'file',
        path: currentPath,
        contents: file.contents,
      };
    }
  }

  // Create a parent-child relationship among directories
  for (const dirPath of Object.keys(fileTree)) {
    const parentDir = dirPath.substring(0, dirPath.lastIndexOf('/'));
    if (parentDir && fileTree[parentDir]) {
      fileTree[parentDir].children.push(dirPath);
    }
  }

  fileTree['/app'].root = true;

  return fileTree;
};
