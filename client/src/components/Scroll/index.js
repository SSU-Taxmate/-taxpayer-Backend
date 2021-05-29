import React, { useEffect, useState } from "react";

function ScrollToTop() {
    const [isVisible,setIsVisible]=useState(false);
    const toggleVisibility=()=>{
        /*y축방향으로 스크롤한 거리 */
        const scrolled = document.documentElement.scrollTop;

        if (scrolled > 100) {
            //console.log(scrolled)
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
    }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
      useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        console.log(isVisible)
      }, []);
    return (
        <>
        {isVisible && 
            <div className="scroll-to-top rounded" onClick={scrollToTop} style={{display:'inline'}}>
            <i className="fas fa-angle-up"></i>
          </div>
          }
          </>
    )
}

export default ScrollToTop
