const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

module.exports =  User = {
    findAll : async ()=>{
        return await prisma.User.findAll()
    },
    findBy: async (target,value)=>{
        const user = await prisma.User.findUnique({where: {[target]:value}})
        return user
    },
    create: async (data)=>{
        data.password = bcrypt.hashSync(data.password, 10);
        try {
            return await prisma.User.create({
                data:{
                    email:data.email,
                    password:data.password
                }
            })
        } catch (e) {
            if (e.code === 'P2002') {
                console.log(
                'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
    }
}
