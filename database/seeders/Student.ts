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
      {
        first_name: 'James',
        last_name: 'Harden',
        email: 'j.harden@gmail.com',
        age: 21,
      },
      {
        first_name: 'Chloe',
        last_name: 'Alexander',
        email: 'c.alexander@gmail.com',
        age: 25,
      },
      {
        first_name: 'Gunbae',
        last_name: 'St',
        email: 'g.st@gmail.com',
        age: 33,
      },
    ])
  }
}
