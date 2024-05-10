const CustomSearchInput = ({ placeholder, type = "text", value, onChange, onKeyPress }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onKeyPress && onKeyPress(e); 
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
};

export default CustomSearchInput;