##Chicken and the Egg - Skinning a TelUI Application##

**TODO:** Explain the usage of the `$rootscope` to use a blank theme initially in the `link` element of your index file and set it later based on a clientID service call resolving and setting it on `$rootscope`.

There are several ways to solve this issue including
  * Supplying clientID to the server and dealing with the clientID service, rendering the `link` tag using server-side templates in the index.
  * Dynamicaly creating a `link` element with the right attributes set in the `resolve` of your service call.
  * Including the `link` element in the partial that has access to the scope that has the clientID service call information.

... but, this is the accepted way of supporting this feature in SRS4 and ChannelComparisonTool.