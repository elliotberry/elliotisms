import path from 'path';
const truncateFilenameForConsole = (filename,  maxLength=50) => {
 
        if (filename.length <= maxLength) return filename;
      
        const ext = path.extname(filename);
        const base = path.basename(filename, ext);
        const totalLength = base.length + ext.length;
        
        if (totalLength <= maxLength) return filename;
        
        const truncateLength = maxLength - ext.length - 3; // 3 for '...'
        const frontLength = Math.ceil(truncateLength / 2);
        const backLength = Math.floor(truncateLength / 2);
      
        const truncatedBase = base.substring(0, frontLength) + '...' + base.substring(base.length - backLength);
        
        return truncatedBase + ext;
      }

      export default truncateFilenameForConsole;