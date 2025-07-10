const Filter = ({textToDisplay, textToFilterBy, onChange}) => 
  <>
    {textToDisplay}<input id={'filter'}
      value={textToFilterBy}
      onChange={onChange}
      autoComplete='off'
      />
  </>


export default Filter