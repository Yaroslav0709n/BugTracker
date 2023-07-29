import React, { CSSProperties, useState } from 'react';

interface ListProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const HeaderList: React.FC<ListProps> = ({children, style}) => {
  return (
    <div>
        <h3 style={{  
                    fontSize: "20px",
                    fontWeight: "bold"
                    }}>
                        {children}
        </h3>
        <div style={style}>
            <p style={{  
                      width: "100px",
                      wordWrap: "break-word",
                      }}>
                        Fullname
            </p>
            <p style={{  
                        marginLeft: "20px",
                        width: "200px",
                        wordWrap: "break-word",
                        }}>
                            Email
            </p>
            <p style={{  
                        marginLeft: "30px",
                        width: "120px",
                        wordWrap: "break-word",
                          }}>
                            Role
            </p>
        </div>           
    </div>
  );
};

export default HeaderList;