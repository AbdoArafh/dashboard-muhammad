import { forwardRef, useRef, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  icon: {
    backgroundColor: "#e3ebf6",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
  },
  checkedIcon: {
    backgroundColor: "#2c7be5",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    "&:before": {
      display: "block",
      width: "1rem",
      height: "1rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
  indeterminate: {
    backgroundColor: "#2c7be5",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    "&:before": {
      display: "block",
      width: "1rem",
      height: "1rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='12' y1='8' x2='4' y2='8' stroke='white' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e\")",
      content: '""',
    },
  },
});

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      icon={<span className={classes.icon} />}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      indeterminateIcon={
        <span className={clsx(classes.icon, classes.indeterminate)} />
      }
      indeterminate={
        resolvedRef.current ? resolvedRef.current.indeterminate : false
      }
      ref={resolvedRef}
      {...rest}
    />
  );
});

export default IndeterminateCheckbox;
