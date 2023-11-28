import React, { useMemo } from "react";

interface SliceNameProps {
  email: string | undefined;
}

const SliceEmailToName: React.FC<SliceNameProps> = ({ email }) => {
  const slicedName = useMemo(() => {
    if (email) {
      const sliceEmail = email.indexOf("@");
      if (sliceEmail !== -1) {
        const userName = email.substring(0, sliceEmail);
        return userName;
      }
    }
    return "";
  }, [email]);

  return <>{slicedName}</>;
};

export default SliceEmailToName;
