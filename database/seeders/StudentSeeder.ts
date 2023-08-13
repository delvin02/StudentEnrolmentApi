import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Student.createMany([
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    ])
  }
}
