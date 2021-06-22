/*define a property called logController. 
The value of this property is the import of the logController file.
define a property called userController. 
The value of this property is the import of the userController file.
*/

module.exports = {
    userController: require('./usercontroller'),
    logController: require('./logcontroller'),
};