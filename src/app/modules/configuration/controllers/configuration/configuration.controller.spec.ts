import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';

import { ConfigurationController } from './configuration.controller';
import { VersionResponse } from '../../interfaces/version-response.interface';

describe('ConfigurationController', () => {
    let module: TestingModule;
    beforeEach(() => {
        return Test.createTestingModule({
        controllers: [
            ConfigurationController
        ]
        }).compile()
        .then(compiledModule => module = compiledModule);
    });

    let controller: ConfigurationController;
    beforeEach(() => {
        controller = module.get(ConfigurationController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });

    describe('version', () => {
        it('should return a VersionResponse', () => {
            const result = controller.version();
            expect(result).toMatchObject({} as VersionResponse);
        });
    });
});
