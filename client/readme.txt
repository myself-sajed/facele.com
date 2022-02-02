if you want a certain component tom rerender and that component is remote. means you want to rerender that
component while youre in sibling 
component do following :

1. pass a prop into the component you wish to rerender after some action
2. component useeffect only works when component renders, when state or prop changes
3. change the redux state and get that redux state using useSelector() into component you wish to rerender and assign 
that changed value to the prop
4. make sure that prop is inside the dependency array of the useEffect you want to be triggered