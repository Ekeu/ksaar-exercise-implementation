# Ksaar file tree exercise implementation steps

I started by building a function called `buildFlatTreeFileStructure` which can be found in `src/TreeUI/helper.ts`. This function takes as argument the files and formats them into a flat tree structure. The returned object has the below structure

```ts
{
    {
        "root"?: boolean, // Property used to identify the root node or root folder
        "isOpen"?: boolean, // Property used to identify if the folder is open or closed
        "path": string, // Property used to identify the path of the file or folder
        "type": string, // Property used to identify whether the item is a file or a folder
        "children"?: [] // Property used to identify the children of the folder
    }
    ...
}
```

Once I implementd the function I started building the `Tree` component. This component received the files throught the `files` prop then with the help of useEffect, I call my `buildFlatTreeFileStructure` function and the result is stored in the `data` state.

With my data already available, built two function:

- `getRootNode` : To get the parent node. I just want to precise here that in the `buildFlatTreeFileStructure` function, to gain some time with the exercise, I considered that the only root node is `/app`. Where as in some cases we can have multiple root nodes.
- `getChildNodes`: To get the files and folders of any node

Next, I created the `Directory` which is responsible for displaying the nodes and their respective children in a recursive manner using the above mentionned methods.

To add a file I created a `AddFile` component which takes as props the node on which we want to the file and the change event method.

Once the file is selected from our file system and that the change event is fired, we create a file reader object to which we pass the selected file. Once it's done reading we simply get the name and file content and then update our data.

### What was not finished

The file upload works but the file is not displayed in the correct node.
