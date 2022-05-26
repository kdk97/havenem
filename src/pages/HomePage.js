import { useEffect, useState } from "react";



export default function HomePage({ showLoader }) {

    useEffect(() => {
      showLoader(false);
    }, [showLoader]);

return(
    <h1>homepage</h1>
)

}