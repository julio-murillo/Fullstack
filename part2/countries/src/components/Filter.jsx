const Filter = ({textToDisplay, textToFilterBy, onChange}) => {
  //console.log('Filter component being executed')
  return(
  <>
    {textToDisplay}<input id={'filter'}
      value={textToFilterBy}
      onChange={onChange}
      autoComplete='off'
      />
  </>
)}

export default Filter