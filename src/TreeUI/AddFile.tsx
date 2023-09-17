import React from 'react';
import { FileFolderStructure } from './helper';

interface IAddFileProps {
  node: FileFolderStructure;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    node: FileFolderStructure
  ) => void;
}

const AddFile: React.FC<IAddFileProps> = ({ node, onFileChange }) => {
  return (
    <div
      style={{
        marginLeft: '5px',
        display: 'flex',
        width: '12px',
        height: '12px',
        justifyContent: 'center',
        border: '1px solid #DADADA',
        background: 'white',
        borderRadius: '4px',
        padding: '3px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          <label
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '4px',
              background: 'white',
              fontWeight: 'semi-bold',
              color: '#4A4A4A',
            }}
            htmlFor='file-upload'
          >
            <span>+</span>
            <input
              type='file'
              name='file-upload'
              id='file-upload'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFileChange(e, node)
              }
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                border: '0',
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddFile;
