import { faker } from '@faker-js/faker';

export class FakerHelper {

  public static generateUserData() {
    return {
      organizationName: faker.company.name(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 12, memorable: false }), 
      ukPhoneNumber: "07432798862", 
      country: 'GB',
    };
  }
}
