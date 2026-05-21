import { BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  const prisma = {
    category: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  let service: CategoriesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CategoriesService(prisma as any);
  });

  it('should return categories ordered by newest first', async () => {
    prisma.category.findMany.mockResolvedValue([{ id: 'c1', name: 'Backend APIs' }]);

    const result = await service.list();

    expect(result).toEqual([{ id: 'c1', name: 'Backend APIs' }]);
    expect(prisma.category.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: 'desc' } });
  });

  it('should create category with normalized slug', async () => {
    prisma.category.create.mockResolvedValue({
      id: 'c1',
      name: 'Backend APIs',
      slug: 'backend-apis',
    });

    const result = await service.create('Backend APIs', 'Backend-APIs');

    expect(result).toEqual(
      expect.objectContaining({
        slug: 'backend-apis',
      }),
    );
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: {
        name: 'Backend APIs',
        slug: 'backend-apis',
      },
    });
  });

  it('should reject create without required fields', async () => {
    await expect(service.create(undefined, 'backend-apis')).rejects.toBeInstanceOf(BadRequestException);
    await expect(service.create('Backend APIs', undefined)).rejects.toBeInstanceOf(BadRequestException);
  });
});
