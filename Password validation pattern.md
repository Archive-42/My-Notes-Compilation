
Length checking:

`^(?=.{8,20}$).+$`

Valid Characters, not repeated thrice:

`^(?!.*([\w\d*?!:;])\1{2}).+$`

`^(?!.*([A-Za-z0-9])\1{2})(?=.*[a-z])(?=.*\d)[A-Za-z0-9]+$`
or
^(?=.{8,20}$)(?=[^A-Za-z]*[A-Za-z])(?=[^0-9]*[0-9])(?:([\w\d*?!:;])\1?(?!\1))+$
(matches in fewer stepts but needs more steps to fail)

Only allow a limited set of symbols (e.g. `.-()/`), not more than two times (non-consecutive)

`^(?!([.()\/-])((?!\1).)+\1((?!\1).)+\1)(?!.*([\/\(\)\.\-])\2)[a-zA-Z\/().\s-]+$`
