import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Student.createMany([
      {
        first_name: 'hello',
        last_name: 'St',
        email: 'asdsa@gmail.com',
        age: 18,
      },
    ])
  }
}
