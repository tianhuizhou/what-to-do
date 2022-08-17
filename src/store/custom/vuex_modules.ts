import CustomModule from '@/store/custom/custom_module'
import api from '@/helper/api'
/* Instruction:
 *  1. GenericModule: the basic class that contains all the common features/properties/methods as a Vuex Store
 *  2. AdvancedModule: the advanced class that extend from GenericModule and add additional features/properties/methods
 *  In some cases, you might consider have custom functions in a class, you can either choose Generic/Advanced module,
 *  wrap all your custom getters/mutations/actions as an object, and then pass it as the second parameter when you initialize the vuex store
 * */

/* Warning:
 *  Make sure your API functions for loading return a JSON format data with exactly one key/property
 *  Otherwise, it is better to override the 'loaded' function in the mutations
 * */

/* Example:
 *  const module = new GenericModule(Endpoint_Function, Args, Timeout)
 *  Endpoint_Function: the API function that set up in api.js
 *  Args: { state: {}, getters: {}, mutations: {} }
 *  For each value in Args, only provide the function you want to override within the corresponding scope
 *  */

export default {
  projects_module: new CustomModule(api.getAllProjects),
}
