import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController {

    /**
     * Registration Controllers
     */
    public async registrationIndex({view}:HttpContextContract){
        return view.render('auth/registration')
    }
    public async registrationStore({request,response,auth}:HttpContextContract){

        const userRegistrationSchema =  schema.create({
            username: schema.string({trim:true},[rules.unique({table:'users',column:'username',caseInsensitive:true})]),
            email: schema.string({trim:true},[rules.email(),rules.unique({table:'users',column:'email',caseInsensitive:true})]),
            password: schema.string({trim:true},[rules.minLength(8)])
        })

        const validateUserRegistrationData = await request.validate({schema:userRegistrationSchema});

        /**
         * Create New User
         */
        const user = await User.create(validateUserRegistrationData);
        

        /**
         * Login the new User after registration Complete
         * Here we no need to use auth.attempt because of new User . 
         * 
         *  auth.attempt - method first check user then by default call auth.login 
         */
        await auth.login(user); 


        /**
         * Redirect The user to the root endpoint
         */
        return response.redirect('/');        
    }












    /**
     * Login Controllers
     */
    public async loginIndex({view}:HttpContextContract){
        return view.render('auth/login')
    }

    public async loginStore({request,response,auth,session}:HttpContextContract){
        const { uid, password } = request.only(['uid','password']);

        try {
            await auth.attempt(uid,password);

        } catch (error) {
            session.flash('loginError','Your Username or Email or Passwrod is incorrect !!')
            return response.redirect().back()
        }
        return response.redirect('/');
    }
    







    

    /**
     * Logut User
     */
    public async logout({response,auth}:HttpContextContract){
        await auth.logout();

        return response.redirect().toRoute('auth.login.form');
    }
    
}
