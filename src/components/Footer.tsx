function Footer() {
  return (
    <>
      <div className=" text-center mt-auto mb-6  flex flex-col">
        <span className="  text-sm text-white opacity-100">
          2026 Genotox DataBase. Version 1.0.0{" "}
        </span>
        <span className="  text-sm text-white opacity-75">
          For maximum safety cross-check{" "}
          <span className="font-semibold opacity-100">
            {" "}
            <a
              className="cursor-pointer transtiion-all duration-300 ease-in-out"
              target="_blank"
              href="https://www.echemportal.org/echemportal/"
            >
              eChemPortal
            </a>{" "}
            ,Lhasa Vitic,{" "}
            <a
              className="cursor-pointer transtiion-all duration-300 ease-in-out"
              target="_blank"
              href="https://lcdb.lhasacloud.org/login"
            >
              Lhasa CDB
            </a>{" "}
          </span>{" "}
        </span>
      </div>
    </>
  );
}

export default Footer;
